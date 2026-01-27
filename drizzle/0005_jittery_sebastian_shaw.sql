CREATE TABLE "auth_link" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "auth_link_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "auth_link" ADD CONSTRAINT "auth_link_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;