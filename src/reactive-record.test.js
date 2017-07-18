import reactiveRecord from './index'


describe('Basic testing', () => {
  const config = {
    apiPrefix: '/hello'
  }
  const record = reactiveRecord(config)
  it('spins up a record instance', () => {
    expect(record).toHaveProperty('apiPrefix', '/hello')
  })
})
