import React from "react";
import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selector";
import MenuItem from "../menu-item/menu-item.component";
import './directory.styles.scss';
const Directory = ({sections})=>(
        <div className="directory-menu">
            {
            sections.map(({id, ...otherSectionPrpos}) =>(
              <MenuItem key={id} {...otherSectionPrpos}/>
            ))
        }
        </div>
 )

 const mapStateToProps = createStructuredSelector({
  sections:selectDirectorySections
 })

 export default connect(mapStateToProps)(Directory);