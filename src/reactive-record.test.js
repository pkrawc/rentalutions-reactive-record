import React from 'react'
import { shallow, mount, render } from 'enzyme'
import reactiveRecord, {
create, all, find, updateAttributes, destroy
} from './index'


describe('Without Redux', () => {
  const config = {
    apiPrefix: '/hello'
  }
  const record = reactiveRecord(config)

  const User = record.model({
    name: 'User',
    schema: {
      name: String,
      email: String,
      photo_url: String,
      _timestamp: Date
    }
  })

  const FakeApp = props => {
    const handleClick = () => {
      e.preventDefault
      all(User).then(res => console.log(res))
    }
    return (
      <div className="fake" onClick={handleClick}></div>
    )
  }

  it('spins up a record instance', () => {
    expect(record).toHaveProperty('apiPrefix', '/hello')
  })

  it('makes a request to the correct endpoint', () => {
    shallow(FakeApp)
  })
})
