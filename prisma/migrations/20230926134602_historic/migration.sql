-- CreateTable
CREATE TABLE "historics" (
    "id" TEXT NOT NULL,
    "music_name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "played_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "historics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historics" ADD CONSTRAINT "historics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
