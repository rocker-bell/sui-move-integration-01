module task_manager::task {

    use sui::object::{Self, UID};
    use sui::tx_context;
    use sui::transfer;

    public struct Task has key, store {
        id: UID,
        description: vector<u8>,
        completed: bool,
        owner: address,
    }

    public fun create_task(description: vector<u8>, ctx: &mut tx_context::TxContext) {
        let sender = tx_context::sender(ctx);

        let task = Task {
            id: object::new(ctx),
            description,
            completed: false,
            owner: sender,
        };

        transfer::transfer(task, sender);
    }

    public fun complete_task(task: &mut Task, ctx: &tx_context::TxContext) {
        let sender = tx_context::sender(ctx);

        assert!(sender == task.owner, 0);

        task.completed = true;
    }
}