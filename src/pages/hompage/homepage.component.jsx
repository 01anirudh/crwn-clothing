import React from "react";
import Directory from "../../components/directory/directory.component";
import {HomePageContainer} from "./hompage.styles";
 
const HomePage = ({history}) =>(
    <HomePageContainer>
       <Directory/>
    </HomePageContainer>
)
export default HomePage;