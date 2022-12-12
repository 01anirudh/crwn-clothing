import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CollectionItem from '../../components/collection-item/collection-item.component.';

import { selectCollection } from '../../redux/shop/shop.selector';
import { CollectionPageStyle,Title,Items } from './collection.styles';

const CollectionPage = () => {
  const {collectionId} = useParams();
  const collection = useSelector(selectCollection(collectionId));
  const { title, items } = collection;
  return (
    <CollectionPageStyle>
      <Title>{title}</Title>
      <Items>
        {items.map(item => (
          <CollectionItem as='div' key={item.id} item={item} />
          ))}
         </Items>
      </CollectionPageStyle>
  );
};

export default CollectionPage;
