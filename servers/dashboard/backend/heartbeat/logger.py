from friday import Logger
from common.args import get_args


args = get_args()

logger = Logger(
    endpoint=args.friday.endpoint,
    namespace=args.friday.namespace,
    topic=args.friday.topic,
)
