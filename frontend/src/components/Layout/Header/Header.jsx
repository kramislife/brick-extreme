import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <nav className="bg-brand-gradient sticky top-0 z-50 py-3 px-3">
        <div className="mx-4 relative text-sm">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <NavLink to="/">
                <img
                  className="h-16 w-auto scale-110 mr-3"
                  src={logo}
                  alt="logo"
                />
              </NavLink>
            </div>

            {/* Desktop Navigation Links */}
            <DesktopNavbar navItems={navItems} />

            {/* Icons Section */}
            <HeaderIcons
              user={user}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              toggleSearch={toggleSearch}
            />
          </div>

          {/* Mobile Navigation Menu */}
          <MobileMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            navItems={navItems}
            user={user}
          />

          {/* Sliding Search Panel */}
          <SearchPanel
            isSearchOpen={isSearchOpen}
            searchPanelRef={searchPanelRef}
            toggleSearch={toggleSearch}
          />
        </div>
      </nav>
    </>
  );
};

export default Header;
