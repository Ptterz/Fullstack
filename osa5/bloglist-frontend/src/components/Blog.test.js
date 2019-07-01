import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Visible content of a blog', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Here my story',
      author: 'Pete',
      url: 'fabulousweb.com',
      likes: 100000,
      user: {
        name: 'Pete',
        username: 'Ptterz'
      }
    }
    const user = {
      name: 'Pete',
      username: 'Ptterz'
    }
    const mockHandler = jest.fn()
    component = render(<Blog blog={blog} increaseLikes={mockHandler} removeBlog={mockHandler} user={user} />)
  })

  test('Initial view', () => {
    expect(component.container).toHaveTextContent('Here my story')
    expect(component.container).toHaveTextContent('Pete')
    expect(component.container).not.toHaveTextContent('fabulousweb.com')
    expect(component.container).not.toHaveTextContent('100000')
  })

  test('Extended view', () => {
    const div = component.container.querySelector('.header')
    fireEvent.click(div)
    expect(component.container).toHaveTextContent('Here my story')
    expect(component.container).toHaveTextContent('Pete')
    expect(component.container).toHaveTextContent('fabulousweb.com')
    expect(component.container).toHaveTextContent('100000 likes')
  })
})