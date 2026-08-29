CREATE TABLE `visitor_country_counts` (
	`country_code` text PRIMARY KEY NOT NULL,
	`visits` integer DEFAULT 0 NOT NULL,
	`first_seen_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`last_seen_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_visitor_country_visits` ON `visitor_country_counts` (`visits`);