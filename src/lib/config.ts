const Config = {
    WORK_DIR: '',
    PROJECTS_DIR: '',
    CONFIG_DIR: ''
};

Config.WORK_DIR = process.env.WORK_DIR || './data';
Config.PROJECTS_DIR = Config.WORK_DIR + '/projects';
Config.CONFIG_DIR = Config.WORK_DIR + '/config';

export default Config;
