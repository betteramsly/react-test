import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchAddPost } from '../../Features/posts/PostsSlice'
import styles from './AddPostModal.module.scss'

export const AddPostModal = ({ open, onClose }) => {
  const [postName, setPostName] = useState('')
  const [postDescription, setPostDescription] = useState('')

  const dispatch = useDispatch()

  const handleCreatePost = () => {
    dispatch(
      fetchAddPost({
        id: String(Math.random()),
        title: postName,
        text: postDescription,
        date: Date.now(),
      })
    )

    onClose()
  }

  return open ? (
    <>
      <div role="button" className={styles.modal}>
        <form onSubmit={(event) => event.preventDefault()} className={styles.form}>
          <input
            className={styles.input}
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            placeholder="Название Поста"
          />
          <input
            className={styles.input}
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            placeholder="Содержание поста"
          />
          <div className={styles.buttons}>
            <button onClick={handleCreatePost} className={styles.submitPost}>
              Добавить
            </button>
            <button onClick={onClose} className={styles.cancelBtn}>
              Отменить
            </button>
          </div>
        </form>
      </div>
      <div onClick={onClose} className={styles.overlay}></div>
    </>
  ) : null
}
