from friday import Logger
from heartbeat.argumentparser import get_args


args = get_args()

logger = Logger(
    endpoint=args.friday_endpoint,
    namespace=args.friday_namespace,
    topic=args.friday_topic,
)
