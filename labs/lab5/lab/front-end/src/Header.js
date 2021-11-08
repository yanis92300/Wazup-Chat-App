
/** @jsxImportSource @emotion/react */

const styles = {
  header: {
    height: '60px',
    backgroundColor: 'grey',
    flexShrink: 0,
    position: "relative",
    bottom:0
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
}

export default function Header() {
  return (
    <header css={styles.header}>
      Header
    </header>
  );
}
