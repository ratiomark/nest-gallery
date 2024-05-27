CREATE TABLE IF NOT EXISTS "nest-gallery_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"url" varchar(1024) NOT NULL,
	"userId" varchar(256) NOT NULL,
	"width" numeric NOT NULL,
	"height" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "nest-gallery_image" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "url_idx" ON "nest-gallery_image" ("url");