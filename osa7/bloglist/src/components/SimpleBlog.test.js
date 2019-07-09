import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders all', () => {
  const blog = {
    title: 'test',
    author: 'me',
    likes: 1
  }
  const click = () => console.log('Clicked!')
  const component = render(
    <SimpleBlog blog={blog} onClick={click} />
  )
  const header = component.container.querySelector('.header')
  const likes = component.container.querySelector('.likes')

  expect(header).toHaveTextContent('test')
  expect(header).toHaveTextContent('me')
  expect(likes).toHaveTextContent('1')
})

test('Two clicks, two eventHandlers', async () => {
  const blog = {
    title: 'test',
    author: 'me',
    likes: 1
  }

  const mockHandler = jest.fn()
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  const clickable = getByText('like', { exact: true })
  fireEvent.click(clickable)
  fireEvent.click(clickable)

  expect(mockHandler.mock.calls.length).toBe(2)
})