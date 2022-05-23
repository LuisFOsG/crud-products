import useTimeAgo from '../hooks/useTimeAgo'

const TimeAgo = ({ timestamp }) => {
  const timeAgo = useTimeAgo(timestamp)

  return (
    <span>{timeAgo}</span>
  )
}

export default TimeAgo
