import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../Collection-Preview/collection-preview.componenet";
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';

import "./collections-overview.styles.scss";

const CollectionsOverview = ( { collections}) => (
    <div className="collection-overview">
            {collections.map(({id, ...othercollectionsProps}) =>(
                    <CollectionPreview key={id} {...othercollectionsProps}/>
                ))
            }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections:selectCollectionsForPreview
}
)

export default connect(mapStateToProps)(CollectionsOverview)