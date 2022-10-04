import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAddComment, fetchSelectedPost, fetchPostComment } from '../../Features/posts/PostsSlice'
import styles from './FullPost.module.scss'

export const FullPost = () => {
  const [commentShow, setCommentShow] = React.useState(false)
  const [commentText, setCommentText] = React.useState('')

  const { data, status } = useSelector((state) => state.posts.selectedPost)
  const { records } = useSelector((state) => state.posts.comments)

  const dispatch = useDispatch()
  const { id } = useParams()

  React.useEffect(() => {
    dispatch(fetchSelectedPost(id))
    dispatch(fetchPostComment())
  }, [id])

  const formattedDate = data ? new Date(data?.date).toLocaleDateString() : ''

  const handleAddComment = () => {
    if (!commentText) return
    const comment = {
      article: id,
      text: commentText,
      user: 'Anonym',
    }
    dispatch(fetchAddComment(comment))
  }

  return (
    <div className={styles.container}>
      {status === 'loading' ? (
        'Загрузка...'
      ) : (
        <>
          <h2 className={styles.title}>{data?.title}</h2>
          <p className={styles.text}>{data?.text}</p>
          <p className={styles.date}>{formattedDate}</p>

          <button onClick={handleAddComment} className={styles.addComment}>
            Добавить комментарий
          </button>
          <input
            className={styles.textInput}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Текст комментария"
          />
          <button
            className={styles.commentButton}
            onClick={() => {
              setCommentShow(commentShow ? false : true)
            }}
          >
            {!commentShow ? 'Открыть комментарии' : 'Скрыть комментрии'}
          </button>
          {commentShow &&
            records?.map((obj) => {
              return (
                <div key={obj.id}>
                  <span className={styles.comments}>{obj.user}</span>
                  <span className={styles.comments}>{obj.text}</span>
                </div>
              )
            })}
        </>
      )}
    </div>
  )
}
