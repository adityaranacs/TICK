
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const GlobalLoader = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <Overlay>
      <LoaderWrapper>
        <div className="loader" />
      </LoaderWrapper>
    </Overlay>
  );
};

export default GlobalLoader;

// ---------- styled-components ----------
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.85); /* Light mode default */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: background 0.3s ease;

  /* ✅ Dark mode background */
  html.dark &,
  body.dark &,
  [data-theme="dark"] & {
    background: rgba(10, 10, 10, 0.85);
  }
`;

const LoaderWrapper = styled.div`
  .loader {
    width: 48px;
    height: 48px;
    margin: auto;
    position: relative;
  }

  .loader:before {
    content: "";
    width: 48px;
    height: 5px;
    background: #999;
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.5s linear infinite;
  }

  .loader:after {
    content: "";
    width: 100%;
    height: 100%;
    background: rgb(61, 106, 255);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: jump7456 0.5s linear infinite;
  }

  @keyframes jump7456 {
    15% {
      border-bottom-right-radius: 3px;
    }
    25% {
      transform: translateY(9px) rotate(22.5deg);
    }
    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }
    75% {
      transform: translateY(9px) rotate(67.5deg);
    }
    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow324 {
    0%,
    100% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.2, 1);
    }
  }
`;
