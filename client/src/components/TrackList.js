import React from "react";
import useTrackListData from "../hooks/useTrackListData";
import useSequenceData from "../hooks/useSequenceData";
import Track from "./Track";

import "./TrackList.css";
import e from "cors";

const TrackList = () => {
  const { state } = useTrackListData();
  const { trackID, setTrackID } = useSequenceData();

  const allTracks = state.trackListData
    .filter((track) => track.is_original)
    .map((track, index) => (
      <div key={index} onClick={() => setTrackID(track.id)}>
        <Track
          trackID={track.id}
          name={track.name}
          title={track.title}
          category={track.category}
          description={track.description}
          isOriginal={track.is_original}
        />
      </div>
    ));
  return (
    <div>
      <div>{allTracks}</div>
    </div>
  );
};

export default TrackList;
