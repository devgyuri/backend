export function getToday() {
  const createdAt = new Date();
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth() + 1;
  const day = createdAt.getDate();
  return `${year}년 ${month}월 ${day}일`;
}
