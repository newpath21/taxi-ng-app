import enum


class STATUSES(enum.Enum):
    REQUESTED = 'REQUESTED'
    STARTED = 'STARTED'
    IN_PROGRESS = 'IN_PROGRESS'
    COMPLETED = 'COMPLETED'

    @classmethod
    def choices(cls):
        return tuple((i.name, i.value) for i in cls)