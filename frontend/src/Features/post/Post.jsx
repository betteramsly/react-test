import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { deletePost } from '../posts/PostsSlice'
import styles from './PostsSlice.module.scss'

export const Post = ({ id, date, title }) => {
  const dispatch = useDispatch()

  const onPostDelete = () => {
    dispatch(deletePost(id))
  }

  return (
    <div className={styles.container}>
      <Link to={`/posts/${id}`}>
        <p className={styles.postTitle}>{title}</p>
        <p className={styles.postDate}>{new Date(date).toLocaleDateString()}</p>
      </Link>
      <button className={styles.deleteBtn} onClick={onPostDelete}>
        Удалить пост
      </button>
    </div>
  )
}
