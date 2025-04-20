export interface Achievement {
  achievementId: number;
  achievementName: string;
  achievementDescription: string;
  achievementImageUrl: string;
  achievementLevelId: number;
  achievementLevelName: string;
  achievementLevelImgUrl: string;
  achievementHasProgressTracking: boolean;
  achievedAt: string;
  userId: number;
  periodId: number;
  progress?: AchievementProgress;
}

export interface AchievementProgress {
  quantity: number;
  required: number;
}
