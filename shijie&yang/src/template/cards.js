import { Link } from "react-router-dom";
import { PlayData } from "../template/Preview";
export const Card = ({ sample }) => {
	return (
		<>
			<div className="card" key={sample.id}>
				<div className="song-details">
					<h3>{sample.name}</h3>
					<p>{new Date(sample.datetime).toLocaleString()}</p>
				</div>
				<div className="button-group-container">
					<PlayData data={sample} />
					<Link to={`/share/${sample.id}`}>share</Link>
					<Link to={`/Createsamples/${sample.id}`}>Edit</Link>
				</div>
			</div>
		</>
	);
};

export const ShareCard = ({ sample }) => {
	return (
		<>
			<div className="card" key={sample.id}>
				<div className="song-details">
					<h3>{sample.name}</h3>
					<p>{new Date(sample.datetime).toLocaleString()}</p>
				</div>

				<div className="button-group-container">
					<PlayData data={sample} />
				</div>
			</div>
		</>
	);
};

export const CreatesampleCard = () => {
	return (
		<>
			<h2 className="title">My Songs</h2>
			<div className="create-card">
				<Link to={`/Createsamples`}>Create Sample</Link>
			</div>
		</>
	);
};
