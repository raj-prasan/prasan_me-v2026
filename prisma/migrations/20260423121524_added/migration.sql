-- AlterTable
ALTER TABLE "Now" ADD CONSTRAINT "Now_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "lastUpdated" ADD CONSTRAINT "lastUpdated_pkey" PRIMARY KEY ("lastUpdate");
