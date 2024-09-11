import logoImg from "./../../../assets/LOGO-02 3.png";

const Header = () => {
  return (
    <header className="px-[16rem] py-[3rem] border-b border-[#DBDBDB]">
         <img
            src={logoImg}
            alt="redberry logo"
            className="w-[15rem] h-[2.4rem]"
          />
    </header>
  );
};

export default Header;