// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuItem = ({ item }: any) => {
  return (
    <a href={item.route}>
      <img src={item.icon} alt="itemIcon" className="w-[25px] h-[25px]" />
      <span>{item.text}</span>
    </a>
  );
};

export default MenuItem;
