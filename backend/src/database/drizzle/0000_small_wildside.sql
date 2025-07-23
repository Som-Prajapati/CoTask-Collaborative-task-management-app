CREATE TABLE `feedback` (
	`feedback_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `list` (
	`list_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `task` (
	`task_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`status` text DEFAULT 'ongoing' NOT NULL,
	`start_d` text DEFAULT (CURRENT_TIMESTAMP),
	`end_d` integer,
	`priority` integer DEFAULT 0,
	`assigner_id` integer,
	`list_id` integer,
	`team_id` integer,
	FOREIGN KEY (`assigner_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`list_id`) REFERENCES `list`(`list_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`team_id`) REFERENCES `team`(`team_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `task_assigned` (
	`assigned_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`task_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`task_id`) REFERENCES `task`(`task_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `team` (
	`team_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`create_d` text DEFAULT CURRENT_TIMESTAMP,
	`imgText` text
);
--> statement-breakpoint
CREATE TABLE `user` (
	`user_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`address` text,
	`gmail` text NOT NULL,
	`password` text,
	`phone` integer,
	`imgText` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_gmail_unique` ON `user` (`gmail`);--> statement-breakpoint
CREATE TABLE `user_team` (
	`team_id` integer,
	`user_id` integer,
	PRIMARY KEY(`team_id`, `user_id`),
	FOREIGN KEY (`team_id`) REFERENCES `team`(`team_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE no action
);
