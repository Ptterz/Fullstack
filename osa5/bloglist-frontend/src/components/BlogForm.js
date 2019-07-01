import React from 'react'

const BlogForm = ({ createBlog, title, author, url }) => (
  <form onSubmit={createBlog}>
    <div>
      <label>Title:</label>
      <input {...title.inputContent} />
    </div>
    <div>
      <label>Author:</label>
      <input {...author.inputContent} />
    </div>
    <div>
      <label>Url:</label>
      <input {...url.inputContent} />
    </div>
    <div>
      <button type="submit">create</button>
    </div>
  </form>
)

export default BlogForm