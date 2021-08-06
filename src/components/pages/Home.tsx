import * as React from 'react';
import "../../styles/home.css";
import Dashboard from '../Dashboard';
import Goals from '../Goals';
 
const Home: React.FC = () => {
    return (
        <div className="home-wrapper">
            <Dashboard />
            <Goals />
        </div>
     );
}
 
export default Home;