// Import necessary modules and schemas
import connectDb from "../../../../middlewares/mongoose";
import Project from "../../../../models/Project";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const project = new Project(req.body);
            const savedProject = await project.save();
            res.status(201).json(savedProject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating project' });
        }
    } else if (req.method === 'GET') {
        const { id } = req.query;

        if (!id) {
            res.status(400).json({ error: 'Project ID is required for retrieval' });
            return;
        }

        try {
            const projects = await Project.findById(id, '-__v')
                .populate({
                    path: 'assignedTeam',
                    select: '-_id -__v',
                    populate: {
                        path: 'teamUserMap',
                        select: '-_id -__v'
                    }
                })
                .populate('assignedBy', '-_id -__v');

            if (!projects) {
                res.status(404).json({ error: 'Project not found' });
                return;
            }

            res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving projects' });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;

        if (!id) {
            res.status(400).json({ error: 'Project ID is required for update' });
            return;
        }

        try {
            const updatedProject = await Project.findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true }
            );

            if (!updatedProject) {
                res.status(404).json({ error: 'Project not found' });
                return;
            }

            res.status(200).json(updatedProject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating project' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) {
            res.status(400).json({ error: 'Project ID is required for deletion' });
            return;
        }

        try {
            const deletedProject = await Project.findByIdAndDelete(id);

            if (!deletedProject) {
                res.status(404).json({ error: 'Project not found' });
                return;
            }

            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error deleting project' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};

export default connectDb(handler);