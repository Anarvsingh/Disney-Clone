import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  // Function to handle authentication
  const handleAuth = async () => {
    try {
      if (!userName) {
        // Sign in with popup
        const result = await auth.signInWithPopup(provider);
        setUser(result.user);
      } else {
        // Sign out
        await auth.signOut();
        dispatch(setSignOutState());
        navigate("/");
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      alert(error.message);
    }
  };

  // Function to set user details in Redux
  const setUser = (user) => {
    if (!user) return;
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  // Effect to handle authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [userName, navigate]);

  return (
    <Nav>
      {/* Logo */}
      <Logo>
        <img src="/Images/logo.svg" alt="Disney+" />
      </Logo>

      {/* Conditional rendering for login/logout */}
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          {/* Navigation Menu */}
          <NavMenu>
            <a href="/home">
              <img src="/Images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a href="/search">
              <img src="/Images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a href="/watchlist">
              <img src="/Images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a href="/originals">
              <img src="/Images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a href="/movies">
              <img src="/Images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a href="/series">
              <img src="/Images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>

          {/* User Profile and Sign Out */}
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

// Styled Components

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  
 img{
    display:block 
}
`;

const NavMenu = styled.div`
align-items:center
