CREATE TABLE `feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_id` text NOT NULL,
	`feedback_type` text NOT NULL,
	`subject` text NOT NULL,
	`content` text NOT NULL,
	`source_url` text,
	`submitter_name` text,
	`contact` text,
	`context` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `feedback_public_id_unique` ON `feedback` (`public_id`);--> statement-breakpoint
CREATE INDEX `idx_feedback_status_created_at` ON `feedback` (`status`,`created_at`);--> statement-breakpoint
PRAGMA optimize;
