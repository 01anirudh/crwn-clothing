import React from "react";
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import {
    MenuItemContainer,
    BackgroundImageContainer,
    ContentContainer,
    ContentTitle,
    ContentSubtitle
  } from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
  const navigate = useNavigate();
  const params = useParams();
  const match = useMatch(linkUrl);
  
  const handleClick = () => {
    navigate(`${linkUrl}`, { state: { from: params, match: match } });
  };

  return (
    <MenuItemContainer
      size={size}
      onClick={handleClick}
    >
      <BackgroundImageContainer
        className='background-image'
        imageUrl={imageUrl}
      />
      <ContentContainer className='content'>
        <ContentTitle>{title.toUpperCase()}</ContentTitle>
        <ContentSubtitle>SHOP NOW</ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default MenuItem;
