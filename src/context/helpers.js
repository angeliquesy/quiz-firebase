export function reducerHandler(handlers) {
  return (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
  }
}
