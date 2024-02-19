use starknet::ContractAddress;

#[starknet::interface]
trait ITip<TContractState> {
    fn deposit(ref self: TContractState, fid: felt252, amount: u256);
    fn tip(ref self: TContractState, from_fid: felt252, to_fid: felt252, amount: u256);
    fn withdraw(ref self: TContractState, fid: felt252, address: ContractAddress);
    fn get_balance(self: @TContractState, fid: felt252) -> u256;
    fn get_owner(self: @TContractState) -> ContractAddress;
    fn set_owner(ref self: TContractState, new_owner: ContractAddress);
}

#[starknet::contract]
mod Tip {
    use core::starknet::event::EventEmitter;
    use core::box::BoxTrait;
    use core::option::OptionTrait;
    use core::traits::TryInto;
    use starknet::{ContractAddress, get_tx_info, get_caller_address, get_contract_address};
    use tipping::interfaces::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};

    #[storage]
    struct Storage {
        balance: LegacyMap<felt252, u256>,
        owner: ContractAddress
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Deposit: Deposit,
        Tip: Tip,
        Withdraw: Withdraw,
        SetOwner: SetOwner
    }

    #[derive(Drop, starknet::Event)]
    struct Deposit {
        fid: felt252,
        amount: u256
    }

    #[derive(Drop, starknet::Event)]
    struct Tip {
        from_fid: felt252,
        to_fid: felt252,
        amount: u256
    }

    #[derive(Drop, starknet::Event)]
    struct Withdraw {
        fid: felt252,
        amount: u256
    }

    #[derive(Drop, starknet::Event)]
    struct SetOwner {
        new_owner: ContractAddress
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
    }

    #[abi(embed_v0)]
    impl TipImpl of super::ITip<ContractState> {
        fn deposit(ref self: ContractState, fid: felt252, amount: u256) {

            let previous_balance = self.balance.read(fid);
            let new_balance = previous_balance + amount;
            // usdc has 6 decimals
            assert(new_balance < 501_000000, 'max allowed balance is 500 USDC');

            let contract_address = get_contract_address();

            let caller_address = get_caller_address();
            // TODO: change this address to USDC
            let eth_address: ContractAddress =
                0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                .try_into()
                .unwrap();

            IERC20Dispatcher { contract_address: eth_address }
                .transfer_from(caller_address, contract_address, amount);

            self.balance.write(fid, new_balance);

            self.emit(Deposit { fid, amount });
        }

        fn tip(ref self: ContractState, from_fid: felt252, to_fid: felt252, amount: u256) {
            let caller_address = get_caller_address();
            assert(caller_address == self.owner.read(), 'Only owner can tip');

            let from_balance = self.balance.read(from_fid);
            assert(from_balance >= amount, 'Insufficient balance');

            let to_balance = self.balance.read(to_fid);
            self.balance.write(to_fid, to_balance + amount);
            self.balance.write(from_fid, from_balance - amount);

            self.emit(Tip { from_fid, to_fid, amount });
        }

        fn withdraw(ref self: ContractState, fid: felt252, address: ContractAddress) {
            let caller_address = get_caller_address();
            assert(caller_address == self.owner.read(), 'Only owner can withdraw');

            let eth_address: ContractAddress =
                0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                .try_into()
                .unwrap();

            let amount = self.balance.read(fid);

            IERC20Dispatcher { contract_address: eth_address }.transfer(address, amount);

            self.balance.write(fid, 0);

            self.emit(Withdraw { fid, amount });
        }

        fn get_balance(self: @ContractState, fid: felt252) -> u256 {
            self.balance.read(fid)
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }

        fn set_owner(ref self: ContractState, new_owner: ContractAddress) {
            let caller_address = get_caller_address();
            assert(caller_address == self.owner.read(), 'Only owner can set owner');
            self.owner.write(new_owner);

            self.emit(SetOwner { new_owner });
        }
    }
}
