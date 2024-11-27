const Notification = require('../models/Notification');


const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({
                message: 'Notification not found'
            });
        }
        res.json(notification);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({
                message: 'Notification not found'
            });
        }
        await notification.destroy();
        res.status(204).json({
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}



module.exports = {
    getNotifications,
    getNotification,
    deleteNotification
}