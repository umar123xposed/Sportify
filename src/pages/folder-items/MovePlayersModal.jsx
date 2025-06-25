import React, { useEffect, useState } from "react";
import "./index.css";
import { useQuery } from "@apollo/client";
import { Get_ALL_FOLDERS } from "../../graphql/query/query";

const dummyFolders = [
  { id: 1, name: "English Premier League", date: "02/10/2024" },
  { id: 2, name: "English Premier League", date: "02/10/2024" },
  { id: 3, name: "English Premier League", date: "02/10/2024" },
];

const MovePlayersModal = ({ show, setShow, onMove, folder_id }) => {
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [folderSearchInput, setFolderSearchInput] = useState("");
  const [debouncedFolderSearch, setDebouncedFolderSearch] = useState("");

  const filteredFolders = dummyFolders.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedFolderSearch(folderSearchInput);
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [folderSearchInput]);

  const {
    loading: loading3,
    error: error3,
    data: AllFolders,
    refetch: refetchFolders,
  } = useQuery(Get_ALL_FOLDERS, {
    variables: {
      input: {
        cursor: null,
        excludeId: Number(folder_id),
        search: debouncedFolderSearch,
        limit: 3,
      },
    },
    fetchPolicy: "no-cache",
  });

  // Optional: re-trigger refetch on debounce change
  useEffect(() => {
    refetchFolders({
      input: {
        cursor: null,
        excludeId: Number(folder_id),
        limit: 3,
        search: debouncedFolderSearch,
      },
    });
  }, [debouncedFolderSearch]);

  if (!show) return null;

  return (
    <div className="move-modal-backdrop">
      <div className="move-modal">
        <button className="move-modal-close" onClick={() => setShow(false)}>
          &times;
        </button>
        <div className="move-modal-title">Select Folder to Move Players</div>
        <input
          className="move-modal-search"
          type="text"
          placeholder="Search by Folder Name"
          value={folderSearchInput}
          onChange={(e) => {
            setFolderSearchInput(e.target.value);
          }}
        />
        <div className="move-modal-folder-list">
          {AllFolders?.getAllFolders?.data?.map((folder) => (
            <div
              className={`move-modal-folder-item${
                selectedFolder === folder.id ? " selected" : ""
              }`}
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
            >
              <span className="move-modal-folder-icon">📁</span>
              <div>
                <div className="move-modal-folder-name">{folder?.name}</div>
                <div className="move-modal-folder-date">
                  Created on: {folder.date}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="move-modal-move-btn"
          disabled={!selectedFolder}
          onClick={() => {
            onMove(selectedFolder);
            setShow(false);
          }}
        >
          Move
        </button>
      </div>
    </div>
  );
};

export default MovePlayersModal;