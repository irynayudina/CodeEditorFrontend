import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { calculateTimeDifference } from "./UpdateTimeCalculate";

export const useProjectData = (projectId, userInfo) => {
  const [projectInfo, setProjectInfo] = useState(null);
  const [collabId, setCollabId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loadedProjectIdRef = useRef(null);

  const getCollab = async (projectId) => {
    try {
      const response = await axios.get(
        `https://codeeditorbackend-production.up.railway.app/api/collab/projectId?associatedProject_id=${projectId}`,
        { withCredentials: true }
      );
      if (response?.data?.collabId) {
        setCollabId(`/documents/${response.data.collabId}`);
      } else {
        setCollabId("/collaboratory");
      }
    } catch (err) {
      console.log(err?.response?.data?.message || err.error);
      setCollabId("/collaboratory");
    }
  };

  useEffect(() => {
    // Prevent loading the same project multiple times
    if (!projectId || loadedProjectIdRef.current === projectId) {
      return;
    }
    
    loadedProjectIdRef.current = projectId;
    setIsLoading(true);
    
    const getProjectData = async () => {
      try {
        const response = await axios.get(
          `https://codeeditorbackend-production.up.railway.app/api/projects/id?id=${projectId}`,
          { withCredentials: true }
        );
        
        if (response?.data) {
          const project = response.data;
          
          // Format dates
          const updatedDate = calculateTimeDifference(project.updatedAt);
          const createdDate = new Date(project.createdAt);
          const formattedCreatedDate = createdDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
          
          setProjectInfo({
            ...project,
            updatedAt: updatedDate,
            createdAt: formattedCreatedDate,
          });
          
          await getCollab(projectId);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || err.error);
        loadedProjectIdRef.current = null; // Allow retry on error
      } finally {
        setIsLoading(false);
      }
    };
    
    getProjectData();
  }, [projectId]);

  const isOwner = projectInfo?.author?._id === userInfo?._id;

  return {
    projectInfo,
    isOwner,
    collabId,
    isLoading,
  };
};

