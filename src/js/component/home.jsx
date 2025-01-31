import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Task } from "./Task";

//create your first component
const Home = () => {
	return (
		<div className="container">
			<h1 className="text-center mt-5">LIST WITH FETCH</h1>
			<Task />
		</div>
	);
};

export default Home;
