import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../Collection-Preview/collection-preview.componenet";
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';

import { CollectionOverview } from "./collection-overview.style";

const CollectionsOverview = ( { collections}) => (
    <CollectionOverview>
            {collections.map(({id, ...othercollectionsProps}) =>(
                    <CollectionPreview key={id} {...othercollectionsProps}/>
                ))
            }
    </CollectionOverview>
)

const mapStateToProps = createStructuredSelector({
    collections:selectCollectionsForPreview
}
)

export default connect(mapStateToProps)(CollectionsOverview)