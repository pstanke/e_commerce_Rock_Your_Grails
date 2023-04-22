import logo from './smallLogo.png';

export const Logo = () => {
  return (
    <div className="d-flex justify-content-center">
      <img src={logo} alt="Logo" className="img-fluid" />
    </div>
  );
};
