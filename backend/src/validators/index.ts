import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { user } from '../database/schema';

//Create Schemas and Validators
export const createUserSchema = z.object({
  name: z.string().max(50),  
  gmail: z.string().max(200).email(),
  address: z.string().max(300).optional(), 
  phone: z.number().int().max(9999999999).optional(), 
  password: z.string().max(20).optional(), 
  imgtext:  z.string().max(300).optional(), 
});

export const createUserValidator = zValidator('json', createUserSchema);

export const createListSchema = z.object({
  name: z.string().max(50),  
  user_gmail: z.string().email().max(200),
});

export const createListValidator = zValidator('json', createListSchema);


export const createTaskSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(300),
  status: z.enum(["ongoing", "completed", "missed"]),
  end_d: z.string(),
  start_d: z.string().max(30).optional(),
  priority: z.number().int().max(5).optional(),
  user_gmail: z.string().max(200).email(),
  list_name: z.string().max(50).optional(),
  team_name :  z.string().max(50).optional(),
});


export const createTaskValidator = zValidator('json', createTaskSchema);




export const createTeamSchema = z.object({
  title: z.string().max(50),
  user_array : z.array(z.string().max(200)),
  imgtext:  z.string().max(300).optional(), 

});


export const createTeamValidator = zValidator('json', createTeamSchema);

export const createUser_teamSchema = z.object({
  team_id: z.number().int().max(9999),
  user_gmail : z.string().max(200).email()
});

export const createUser_teamValidator = zValidator('json', createUser_teamSchema);

export const createFeedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(300).optional(),
  user_gmail:z.string().max(200).email()
});

export const createFeedbackValidator = zValidator('json', createFeedbackSchema);

export const createTeamTaskSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(300),
  status: z.enum(["ongoing", "completed", "missed"]),
  end_d: z.string(),
  start_d: z.string().max(30).optional(),
  priority: z.number().int().max(5).optional(),
  user_gmail: z.string().max(200).email(),
  team_name: z.string().max(50).optional(),
  user_array : z.array(z.string().max(200)),
 
});

export const createTeamTaskValidator = zValidator('json', createTeamTaskSchema);





// Get Schemas and Validators


export const getUserSchema = z.object({
});
export const getUserValidator = zValidator('json', getUserSchema);

export const getListSchema = z.object({
  user_gmail : z.string().max(200).email()
});
export const getListValidator = zValidator('json', getListSchema);

export const getTaskSchema = z.object({
  user_gmail: z.string().max(200).email(),
  list_name : z.string().max(50)
});
export const getTaskValidator = zValidator('json', getTaskSchema);

export const getTeamSchema = z.object({
  user_gmail : z.string().max(200).email()
});
export const getTeamValidator = zValidator('json', getTeamSchema);

export const getTeamTaskSchema = z.object({
  user_gmail: z.string().max(200).email(),
  team_name : z.string().max(50)
});
export const getTeamTaskValidator = zValidator('json', getTeamTaskSchema);

export const getTaskAssignedSchema = z.object({
  team_name: z.string().max(50),
  task_id: z.number().int()
});
export const getTaskAssignedValidator = zValidator('json', getTaskAssignedSchema);






// export const getFeedbackSchema = z.object({
// });
  
// export const getFeedbackValidator = zValidator('json', getFeedbackSchema);



/// Patch Schema and Validator


export const updateUserSchema = z.object({
  user_gmail :  z.string().max(200).email(),
  name : z.string().max(50).optional(),
  phone: z.number().int().max(9999999999).optional(),
  password: z.string().max(30).optional(),
  address: z.string().max(300).optional(),
  imgText :z.string().max(300).optional(),


});

export const updateUserValidator = zValidator('json', updateUserSchema);

export const updateTaskSchema = z.object({
  user_gmail :  z.string().max(200).email(),
  task_name: z.string().max(50),
  status: z.enum(["ongoing", "completed", "missed"]),
});

export const updateTaskValidator = zValidator('json', updateTaskSchema);












//// Delete Schema and Validators
export const deleteListSchema = z.object({
  user_gmail: z.string().max(200).email(),
  name :  z.string().max(30)
});
export const deleteListValidator = zValidator('json', deleteListSchema);

export const deleteTaskSchema = z.object({

  user_gmail: z.string().max(200).email(),
  task_id :  z.number().int()
});
export const deleteTaskValidator = zValidator('json', deleteTaskSchema);

export const deleteTeamSchema = z.object({
  user_gmail: z.string().max(200).email(),
  team_name :  z.string().max(50)
});
export const deleteTeamValidator = zValidator('json', deleteTeamSchema);


export const deleteTeamTaskSchema = z.object({
  team_name: z.string().max(50),
  task_id :  z.number().int()
});
export const deleteTeamTaskValidator = zValidator('json', deleteTeamTaskSchema);


