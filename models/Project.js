import mongoose from 'mongoose';

const statusEnum = ['In Progress', 'Completed','Not Started'];
const appsEnum = [('Figma', 'http://figma.com')];
const toolsEnum = ['Engineering', 'Design'];
const domainEnum  = [
  "UI/UX Designing",
  "Engineering",
  "Product Management",
  "Data Analysis",
  "Consultancy",
  "Research",
  "Software Development",
  "Marketing and Branding",
  "Business Development",
  "Project Management",
  "Sustainability",
  "AI/ML"
];
const ApplicationSchema = new mongoose.Schema({
  tool:{type:String},
  url:{type:String},
  connectedOn:{type:Date},
  connectedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}

})
export const workSchema = new mongoose.Schema({

  title:{type:String},
  url:{type:String}
  
});


const clientRequirementsSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    enum: ['Fixed', 'Installment']
  },
  payment: {
    type: Number
  },
  workDays: { type: [String] },
  requiredTools: { type: [String] },
  file: { type: workSchema }
});
export const subMilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: statusEnum, default: 'Not Started' },
  description: { type: String, required: true },
  stickyNotes: { type: [String], default: [] }
});

const activitySchema = new mongoose.Schema({
  submilestone:{ type: subMilestoneSchema},
  type: { type: String, enum: ['CREATE', 'EDIT', 'DELETE', 'Message'], required: true },
  timestamp: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String }
});



export const milestoneSchema = new mongoose.Schema({
  dueDate: { type: Date, required: true },
  heading: { type: String, required: true },
  description: { type: String },
  submilestones: [subMilestoneSchema],
  status: { type: String, enum: statusEnum, default: 'Not Started' },
  payment: { type: Number, required: true },
  paymentDate: { type: Date },
  deliverables : { type: String },
  duration: { type: Number },
  files: [String],
  paymentCompleted: {type: Boolean, default: false}
});

const healthSchema = new mongoose.Schema({
  progress: {
    type: Number,
    default: 0
  }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  statement: { type: String, required: true },
  milestones: [milestoneSchema],
  assignedTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  health: healthSchema,
  startDate: { type: Date },
  endDate: { type: Date },
  activities: [activitySchema],
  clientRequirements: clientRequirementsSchema,
  work: [workSchema],
  duration: { type: Number, required: true },
  domain: { type: [{ type: String, required: true ,enum:domainEnum}], required: true },
  postedOn: {type: Date, default: Date.now},
  status: {type: String, enum: ['Open', 'In Review', 'Completed', 'Assigned'], default: 'Open'},
  location: { type: String, required: true},
  connectedApps: { type: [ApplicationSchema] },
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
