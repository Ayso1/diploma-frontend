import { useRouter } from 'next/router';

const AppLink = ({ children, ...props }) => {
  const { push } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    push(props.href);
  };

  return (
    <a
      {...props}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        ...(props.style ?? {}),
      }}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default AppLink;
