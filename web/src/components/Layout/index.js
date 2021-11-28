import DemoNavbarDefault from '../Navbars/DemoNavbarDefault';
import SimpleFooter from '../Footers/SimpleFooter';

const Layout = ({ children }) => {
  return (
    <>
      <DemoNavbarDefault />

      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>

        <section className="section">
          {children}
        </section>
      </main>

      <SimpleFooter />
    </>
  );
};

export default Layout;
