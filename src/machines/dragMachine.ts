import { setup, assign } from 'xstate';
type Context = {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    opacity: number
}
type Events = {
    type: 'DRAG_MOVE'
    x: number;
    y: number;
} | {
    type: "DRAG_START";
    x: number;
    y: number;

} | {
    type: "DRAG_END"
}
export const dragMachine = setup({
    types: {
        context: {} as Context,
        events: {} as Events
    }
}).createMachine({
    initial: 'idle',
    context: {
        x: 0,
        y: 0,
        opacity: 1,
        offsetX: 0,
        offsetY: 0
    },
    states: {
        idle: {
            on: {
                DRAG_START: {
                    target: 'dragging',
                    actions: assign({
                        offsetX: ({ event }) => {
                            console.log("event", event)
                            return event.x
                        },
                        offsetY: ({ event }) => event.y,
                        opacity: ({ context }) => {
                            console.log("context", context)
                            return context.opacity
                        }
                    })
                },
            }
        },
        dragging: {
            on: {
                DRAG_MOVE: {
                    target: 'dragging',
                    actions: assign({
                        x: ({ context, event }) => event.x - context.offsetX,
                        y: ({ context, event }) => event.y - context.offsetY,
                        opacity: 1
                    })
                },
                DRAG_END: {
                    target: 'idle',
                    actions: assign({
                        offsetX: 0,
                        offsetY: 0,
                        opacity: 1
                    })
                }
            }
        },
    }

});