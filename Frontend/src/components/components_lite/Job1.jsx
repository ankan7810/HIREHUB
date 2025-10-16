import React from "react";
import { Button } from "../ui/button";
import { Bookmark, BookMarked } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job1 = ({ job }) => {

  const {
    company,
    title,
    description,
    position,
    salary,
    location,
    jobType,
    _id,
  } = job;

  // For bookmarking feature
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  // Navigation hook
  const navigate = useNavigate();
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3">
      {/* Job time and bookmark button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          {isBookmarked ? <BookMarked /> : <Bookmark />}
        </Button>
      </div>

      {/* Company info and avatar */}
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo}
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      {/* Job title, description, and job details */}
      <div>
        <h2 className="font-bold text-lg my-2">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex gap-2 items-center mt-4">
          <Badge className="text-blue-600 font-bold" variant="ghost">
            {position} Open Positions
          </Badge>
          <Badge className="text-[#FA4F09] font-bold" variant="ghost">
            {salary} LPA
          </Badge>
          <Badge className="text-[#6B3AC2] font-bold" variant="ghost">
            {location}
          </Badge>
          <Badge className="text-black font-bold" variant="ghost">
            {jobType}
          </Badge>
        </div>
      </div>

      {/* Actions: Details and Save for Later */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${_id}`)}
          variant="outline"
          className="font-bold rounded-sm"
        >
          Details
        </Button>
        <Button
          variant="outline"
          className="bg-[#6B3AC2] text-white font-bold rounded-sm"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job1;
